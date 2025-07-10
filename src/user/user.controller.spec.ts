// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UsersService } from './user.service';
// import { Prisma, User, Role } from 'generated/prisma';

// describe('UserController', () => {
//   let controller: UserController;
//   let service: UsersService;

//   const mockUser: User = {
//     id: 1,
//     email: 'test@example.com',
//     role: Role.STUDENT,
//   };

//   const mockUsersService = {
//     createUser: jest.fn(),
//     users: jest.fn(),
//     user: jest.fn(),
//     updateUser: jest.fn(),
//     deleteUser: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         {
//           provide: UsersService,
//           useValue: mockUsersService,
//         },
//       ],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//     service = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a new user', async () => {
//       const createUserDto: Prisma.UserCreateInput = {
//         email: 'test@example.com',
//         name: 'Test User',
//         role: Role.STUDENT,
//       };

//       mockUsersService.createUser.mockResolvedValue(mockUser);

//       const result = await controller.create(createUserDto);

//       expect(result).toEqual(mockUser);
//       expect(mockUsersService.createUser).toHaveBeenCalledWith(createUserDto);
//     });
//   });

//   describe('findAll', () => {
//     it('should return an array of users', async () => {
//       const users = [mockUser];
//       mockUsersService.users.mockResolvedValue(users);

//       const result = await controller.findAll();

//       expect(result).toEqual(users);
//       expect(mockUsersService.users).toHaveBeenCalled();
//     });

//     it('should handle pagination parameters', async () => {
//       const users = [mockUser];
//       mockUsersService.users.mockResolvedValue(users);

//       const result = await controller.findAll('0', '10');

//       expect(result).toEqual(users);
//       expect(mockUsersService.users).toHaveBeenCalledWith({
//         skip: 0,
//         take: 10,
//         cursor: undefined,
//         where: undefined,
//         orderBy: undefined,
//       });
//     });
//   });

//   describe('findOne', () => {
//     it('should return a single user', async () => {
//       mockUsersService.user.mockResolvedValue(mockUser);

//       const result = await controller.findOne(1);

//       expect(result).toEqual(mockUser);
//       expect(mockUsersService.user).toHaveBeenCalledWith({ id: 1 });
//     });
//   });

//   describe('update', () => {
//     it('should update a user', async () => {
//       const updateUserDto: Prisma.UserUpdateInput = {
//         name: 'Updated Name',
//       };

//       const updatedUser = { ...mockUser, ...updateUserDto };
//       mockUsersService.updateUser.mockResolvedValue(updatedUser);

//       const result = await controller.update(1, updateUserDto);

//       expect(result).toEqual(updatedUser);
//       expect(mockUsersService.updateUser).toHaveBeenCalledWith({
//         where: { id: 1 },
//         data: updateUserDto,
//       });
//     });
//   });

//   describe('remove', () => {
//     it('should delete a user', async () => {
//       mockUsersService.deleteUser.mockResolvedValue(mockUser);

//       const result = await controller.remove(1);

//       expect(result).toEqual(mockUser);
//       expect(mockUsersService.deleteUser).toHaveBeenCalledWith({ id: 1 });
//     });
//   });
// });
