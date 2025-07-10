import { Controller, Request, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from 'generated/prisma';
import { CustomJwtAuthGuard } from 'src/auth/auth.guard';

@UseGuards(CustomJwtAuthGuard)
@Controller({
  path: 'users',
  version: '1'
})
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.createUser(createUserDto);
  }

  @Get("all")
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string
  ) {
    return this.usersService.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne({ id });
  }

  @UseGuards(CustomJwtAuthGuard)
  @Get("user/current")
  getCurrent(@Request() req) {
    return this.usersService.findOneWithProfile(Number.parseInt(req.user.id));
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.updateUser({
      where: { id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.deleteUser({ id });
  }
}
