import { createStore } from "../../redux/store";
import { createUsersAsync } from "../../redux/reducers/user/createUserAsync";
import { getAllUsersAsync } from "../../redux/reducers/user/getAllUsersAsync";
import { getSingleUsersAsync } from "../../redux/reducers/user/getSingleUserAsync";
import { updateUserAsync } from "../../redux/reducers/user/updateUserAsync";
import { CreateNewUser } from "../../types/CreateNewUser";
import { UpdateUser, UpdateUserDto } from "../../types/UpdateUser";
import { usersData } from "../dataSeed/usersData.Seed";
import userServer from "../shared/userServer";
import { deleteUserAsync } from "../../redux/reducers/user/deleteUserAsync";

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
    console.log("all users");
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
      password: "12345",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    const result = await store.dispatch(createUsersAsync(user));
    console.log("status", result.meta.requestStatus);
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
      id: "08276e93-2134-4f8e-9960-43b2a84ea101",
      updateUser: updateUserDto,
    };
    const action = await store.dispatch(updateUserAsync(updateUser));
    expect(action.payload).toMatchObject({
      id: "08276e93-2134-4f8e-9960-43b2a84ea101",
      updateUser: {
        name: "Nik Jones",
        email: "nico.Jones@gmail.com",
        //password: "ABCDE",
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
    const result = await store.dispatch(updateUserAsync(updateUser));
    console.log("status", result.meta.requestStatus);
    const error = store.getState().userReducer.error;
    console.log("user not created", error)
    expect(error).toBe("Request failed with status code 400");
  });
  test("delete an existing user", async () => {
    const resultAction = await store.dispatch(deleteUserAsync("0678f309-9add-4ca1-8b8b-6462f61cf8b3"));
    console.log('resultAction.payload', resultAction.payload)
    expect(resultAction.payload).toBe("0678f309-9add-4ca1-8b8b-6462f61cf8b3");
  });
});
