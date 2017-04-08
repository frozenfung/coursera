// push constant 7
// addr=SP
// *addr=7
// SP++

@7
D=A
@0
A=M
M=D
@0
M=M+1

// push constant 8
// addr=SP
// *addr=7
// SP++

@8
D=A
@0
A=M
M=D
@0
M=M+1

// eq
@0
D=M-1
M=M-1
A=D
D=M

@temp
M=D

@0
D=M-1
M=M-1
A=D
D=M

@temp
D=D-M

@EQ0
D; JEQ

@NEQ0
0; JMP

(BACK0)

// the end
(END)
@END
0; JMP

(NEQ0)
@0
A=M
M=0

@BACK0
0; JMP

(EQ0)
@0
A=M
M=-1

@BACK0
0; JMP
