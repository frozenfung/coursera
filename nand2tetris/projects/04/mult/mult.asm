// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.

// initalise
//
// i = 0
// sum = 0
//
// Loop
//
// a = RAM[0]
// b = RAM[1]
// for(i=0; i<b; i++) {
//   sum = sum + a;
// }
//
// End
//
// RAM[2] = sum

@i
M=0
@sum
M=0

// check if R0 and R1 is not equal to zero
@R0
D=M

@R2
M=D

@END
D; JEQ

@R1
D=M

@R2
M=D

@END
D; JEQ

(LOOP)
// get R0
@R0
D=M

// sum = sum + R0
@sum
MD=D+M

// set sum to R2
@R2
M=D

// i = i + 1
@i
MD=M+1

// check if i > R1
@R1
D=M-D

@LOOP
D;JGT

@END
D;JLE

(END)
@END
0;JMP


