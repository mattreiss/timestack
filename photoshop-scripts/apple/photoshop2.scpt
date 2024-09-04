on run argv
  tell application "Adobe Photoshop 2024"
    set js to "#include '" & item 1 of argv & "';" & return
    set js to js & "main(arguments);" & return
    do javascript js with arguments argv
  end tell
end run
