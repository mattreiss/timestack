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

def to_even(number):
  n = int(number)
  if n % 2 != 0:
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
  if exif is not None and orientation is not None and orientation in exif:
    if exif[orientation] == 6 or exif[orientation] == 8:
      h = img.width
      w = img.height

  return to_even(w), to_even(h)


def resize_img(path, width, height):
  w = to_even(width)
  h = to_even(height)
  img = Image.open(path)
  out = img.resize((w, h))
  out.save(path)


def recreate_dir(path):
  if os.path.exists(path):
    shutil.rmtree(path)
  os.makedirs(path)

def main(directory, fps, stack_length, effect, _width, _height, animation, stackMode):
  input = get_input()
  files = load_image_files(directory)
  input['fps'] = int(fps)
  input['stackLength'] = int(stack_length)
  input['stackMode'] = stackMode
  input['start'] = 0
  input['prefix'] = ''
  ext = files[0].split('.')[-1]
  input['ext'] = ext
  input['durationInFrames'] = len(files)
  width, height = get_dimensions('{}/{}'.format(directory, files[0]))
  w = width
  h = height
  if _width > 0:
    h = height * _width / width
    w = _width
  elif _height > 0:
    w = width * _height / height
    h = _height
  input['width'] = to_even(w)
  input['height'] = to_even(h)
  input['effect'] = effect
  input['animation'] = animation
  recreate_dir('./public/images')
  for i, filename in enumerate(files):
    src = '{}/{}'.format(directory, filename)
    dst = f'./public/images/{i}.{ext}'
    shutil.copyfile(src, dst)
    resize_img(dst, w, h)
  set_input(input)
  subprocess.run(["yarn", "build"])
  


if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument("-D", "--directory", required=True, help="directory containing images")
  parser.add_argument("-FPS", "--fps", required=False, default=60, help="fps for video")
  parser.add_argument("-S", "--stack_length", required=False, default=1, help="length to stack images")
  parser.add_argument("-W", "--width", required=False, default=900, help="width of output")
  parser.add_argument("-H", "--height", required=False, default=-1, help="height of output")
  parser.add_argument("-E", "--effect", required=False, default='lighten', help="effect to apply to images")
  parser.add_argument("-M", "--mode", required=False, default='lighten', help="stack mode to apply to images")
  parser.add_argument("-A", "--animation", required=False, default='none', help="effect to apply to images")
  args = parser.parse_args()
  main(
    args.directory, 
    args.fps, 
    args.stack_length, 
    args.effect,
    args.width,
    args.height,
    args.animation,
    args.mode)