import { createStore } from "../../redux/store";
import { createUsersAsync } from "../../redux/reducers/user/createUserAsync";
import { getAllUsersAsync } from "../../redux/reducers/user/getAllUsersAsync";
import { getSingleUsersAsync } from "../../redux/reducers/user/getSingleUserAsync";
import { updateUserAsync } from "../../redux/reducers/user/updateUserAsync";
import { CreateNewUser } from "../../types/CreateNewUser";
import { UpdateUser, UpdateUserDto } from "../../types/UpdateUser";
import { usersData } from "../dataSeed/usersData.Seed";
import userServer from "../shared/userServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

// Enable API mocking before tests.
beforeAll(() => userServer.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => userServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => userServer.close());

describe("Test user reducer async actions", () => {
  test("get all users", async () => {
    await store.dispatch(getAllUsersAsync());
    expect(store.getState().userReducer.users.length).toBe(3);
  });
  test("get a user by user Id", async () => {
    await store.dispatch(getSingleUsersAsync(usersData[0].id));
    expect(store.getState().userReducer.singleUser?.id).toBe(usersData[0].id);
  });
  test("should create a user", async () => {
    const user: CreateNewUser = {
      name: "Nik Jones",
      email: "nico.Jones@gmail.com",
      password: "1234",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    await store.dispatch(createUsersAsync(user));
    const createdUser = store.getState().userReducer.users;
    expect(store.getState().userReducer.users.length).toBe(1);
  });
  test("should update a user", async () => {
    const updateUserDto: UpdateUserDto = {
      name: "Nik Jones",
      email: "nico.Jones@gmail.com",
      // password: "ABCDE",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      role: "customer",
    };
    const updateUser: UpdateUser = {
      id: "c6a2dc3a-167b-4006-878a-806b2b2386c2",
      updateUser: updateUserDto,
    };
    const action = await store.dispatch(updateUserAsync(updateUser));

    expect(action.payload).toMatchObject({
      id: 1,
      updateUser: {
        name: "Nik Jones",
        email: "nico.Jones@gmail.com",
        password: "ABCDE",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      },
    });
  });
  test("should not update a user with worng user Id", async () => {
    const updateUserDto: UpdateUserDto = {
      name: "Nik Jones",
      email: "nico.Jones@gmail.com",
      // password: "ABCDE",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      role: "customer",
    };
    const updateUser: UpdateUser = {
      id: "88616690-4a22-4b10-a5d6-40120c483fa0",
      updateUser: updateUserDto,
    };
    await store.dispatch(updateUserAsync(updateUser));
    const error = store.getState().userReducer.error;
    expect(error).toBe("Request failed with status code 400");
  });
});
