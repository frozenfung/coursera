// addr = LCL+2
@1
D=M
@2
D=D+A
// temp = address
@temp
M=D
// SP --
@0
M=M-1
// *addr = *SP
D=M
@temp
A=M
M=D
