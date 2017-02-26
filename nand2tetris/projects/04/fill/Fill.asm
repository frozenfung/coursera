// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

@8192
D=A
@boundary
M=D

(LOOP)
@SCREEN
D=A
@address
M=D
@i
M=0

@KBD
D=M

@BLACK
D; JGT

@WHITE
D; JEQ

(BLACK)
@address
A=M
M=-1

@i
M=M+1

@1
D=A

@address
M=D+M

@KBD
D=M

@LOOP
D; JEQ

@boundary
D=M

@i
D=M-D

@BLACK
D; JLT

(BLACKEND)

@KBD
D=M

@LOOP
D; JEQ

@BLACKEND
0; JMP

(WHITE)
@address
A=M
M=0

@i
M=M+1

@1
D=A

@address
M=D+M

@KBD
D=M

@LOOP
D; JGT

@boundary
D=M

@i
D=M-D

@WHITE
D; JLT

(WHITEEND)

@KBD
D=M

@LOOP
D; JGT

@WHITEEND
0; JMP

