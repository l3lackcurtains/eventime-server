import axios from "axios";
import { createTypeormConnection } from "../utils/createTypeormConnection";

const API_URL = "http://localhost:7000/graphql";

beforeAll(async () => {
  const conn = await createTypeormConnection();
  const queryRunner = conn.createQueryRunner();
  const userTable = await queryRunner.getTable("user");
  await queryRunner.dropTable(userTable);
});
describe("User Registration", () => {
  const email = "test@gmail.com";
  const password = "test111111";
  const name = "Test test";
  const mutation = `mutation Register($email: String!, $password: String!, $name: String!) {
      register(email: $email, password: $password, name: $name)
    }`;
  test("Normal user registration", async () => {
    //
    const res1 = await axios.post(API_URL, {
      query: mutation,
      variables: {
        email,
        password,
        name
      }
    });

    const registered = res1.data.register;

    expect(registered).toBeTruthy();
  });

  test("User Email already esists", async () => {
    const res = await axios.post(API_URL, {
      query: mutation,
      variables: {
        email,
        password,
        name
      }
    });
    expect(res.data.data).toBeNull();
  });
});
