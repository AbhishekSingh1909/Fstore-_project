import { createStore } from "../../redux/store";
import { authenticateUserAsync } from "../../redux/reducers/userAuthentication/authenticateUserAsync";
import { userLogInAsync } from "../../redux/reducers/userAuthentication/userLogInAsync";
import { userToken, usersData } from "../dataSeed/usersData.Seed";
import authServer from "../shared/authServer";
import { UpdateUser, UpdateUserDto } from "../../types/UpdateUser";
import { updateUserProfileAsync } from "../../redux/reducers/userAuthentication/updateUserProfileAsync";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

// Enable API mocking before tests.
beforeAll(() => authServer.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => authServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => authServer.close());

describe("Test auth reducer async actions", () => {
  test("Should user login with right credential", async () => {
    await store.dispatch(
      userLogInAsync({ email: "john@mail.com", password: "changeme" })
    );
    console.log("login", store.getState().authReducer.user);
    expect(store.getState().authReducer.user).toMatchObject(usersData[0]);
  });
  test("Should not login user with wrong credential", async () => {
    await store.dispatch(
      userLogInAsync({ email: "john@mail.com", password: "cngeme" })
    );
    expect(store.getState().authReducer.error).toBe(
      "user's cedential is not valid"
    );
  });
  test("Should authenticate user with right token", async () => {
    await store.dispatch(
      authenticateUserAsync(userToken.access_token + "_" + '1d696481-3fa2-4d91-a04d-76fa9f986c70')
    );

    console.log("user", store.getState().authReducer.user);
    expect(store.getState().authReducer.user).toMatchObject(usersData[1]);
  });
  test("Should not authenticate user with worng token", async () => {
    await store.dispatch(
      authenticateUserAsync(userToken.refresh_token + "_" + 10)
    );
    expect(store.getState().authReducer.error).toBe(
      "The user is not authorized"
    );
  });
  test("should update user profile", async () => {
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
    const action = await store.dispatch(updateUserProfileAsync(updateUser));
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
});
