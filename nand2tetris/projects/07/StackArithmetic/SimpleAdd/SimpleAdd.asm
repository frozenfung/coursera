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

// add
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

// D=7+8
@temp
D=D+M

// *RAM[0] = D
@0
A=M
M=D

// RAM[0]++
@0
M=M+1





