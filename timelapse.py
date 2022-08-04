import os
import json
import argparse
from functools import cmp_to_key
import shutil
import subprocess
from PIL import Image, ExifTags

INPUT_JSON = 'input.json'

def load_image_files(directory):
  extensions: tuple = (".png", ".jpg", ".jpeg", ".tiff", ".bmp", ".gif", ".tfrecords", ".dng")
  files = os.listdir(directory)
  files = filter(lambda file: file.lower().endswith(extensions), files)
  def format(n): 
    try:
      for ext in extensions:
        n = n.replace(ext,'')
      return int(n)
    except:
      return n
  def compare(i1, i2): 
    v1 = format(i1)
    v2 = format(i2)
    if v1 > v2:
      return 1
    if v2 > v1:
      return -1
    return 0
  files = sorted(files, key=cmp_to_key(compare))
  return files

def get_input():
  data = {}
  with open(INPUT_JSON, 'r') as f:
    data = json.load(f)
  return data

def set_input(data):
  with open(INPUT_JSON, 'w') as f:
    json.dump(data, f)

def to_even(n):
  while n % 2 != 0:
    n -= 1
  return n

def get_dimensions(filepath):
  img = Image.open(filepath)

  for orientation in ExifTags.TAGS.keys():
    if ExifTags.TAGS[orientation]=='Orientation':
      break
  
  exif = img._getexif()

  w = img.width
  h = img.height
  if exif[orientation] == 6 or exif[orientation] == 8:
    h = img.width
    w = img.height

  return to_even(w), to_even(h)

def main(directory, fps, stack_length):
  input = get_input()
  files = load_image_files(directory)
  input['fps'] = int(fps)
  input['stackLength'] = int(stack_length)
  input['start'] = 0
  input['prefix'] = ''
  ext = files[0].split('.')[-1]
  input['ext'] = ext
  input['durationInFrames'] = len(files)
  width, height = get_dimensions('{}/{}'.format(directory, files[0]))
  input['width'] = width
  input['height'] = height
  if os.path.exists('./public/images'):
    shutil.rmtree('./public/images')
  os.makedirs('./public/images')
  for i, filename in enumerate(files):
    src = '{}/{}'.format(directory, filename)
    dst = f'./public/images/{i}.{ext}'
    shutil.copyfile(src, dst)
  set_input(input)
  subprocess.run(["yarn", "build"])
  


if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument("-D", "--directory", required=True, help="directory containing images")
  parser.add_argument("-FPS", "--fps", required=False, default=24, help="fps for video")
  parser.add_argument("-S", "--stack_length", required=False, default=1, help="length to stack images")
  args = parser.parse_args()
  main(args.directory, args.fps, args.stack_length)