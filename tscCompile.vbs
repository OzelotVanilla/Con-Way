DIM objShell
set objShell=wscript.createObject("wscript.shell")
iReturn=objShell.Run("cmd.exe /C tsc -p F:\GitHub\Con-Way\tsconfig.json", 0, TRUE)