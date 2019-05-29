import axios from "axios";

const API_URL = "http://localhost:7000/graphql";

describe("User Login", () => {
  const email = "test@gmail.com";
  const password = "test111111";
  const mutation = `mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password)
    }`;
  test("Normal user registration", async () => {
    const res = await axios.post(API_URL, {
      query: mutation,
      variables: {
        email,
        password
      }
    });

    const logined = res.data.data.login;

    expect(logined).toBeTruthy();
  });

  test("User Password Doesn't match", async () => {
    const res = await axios.post(API_URL, {
      query: mutation,
      variables: {
        email,
        password: `${password}kk`
      }
    });
    expect(res.data.data).toBeNull();
  });
});
