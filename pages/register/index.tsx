import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER_MUTATION } from "../../graphql/createCustomerMutation";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const router = useRouter();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    billingAddress: "",
    shippingAddress: "",
    phone: "",
    password: "",
  });

  const [createUser] = useMutation(CREATE_CUSTOMER_MUTATION);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await createUser({ variables: { record: newUser } });
        await router.push("/");
        alert("Register success");
      } catch (err) {
        console.log(err);
        alert("Register failed");
      }
    },
    [createUser, router, newUser]
  );

  return (
    <form className="RegisterForm-form" onSubmit={handleRegister}>
      <input
        type="text"
        name="email"
        value={newUser.email}
        onChange={handleInputChange}
        placeholder="E-Mail"
        required
      />
      <input
        type="text"
        name="username"
        value={newUser.username}
        onChange={handleInputChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={newUser.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
      />
      <input
        type="text"
        name="phone"
        value={newUser.phone}
        onChange={handleInputChange}
        placeholder="Phone"
      />
      <input
        type="text"
        name="billingAddress"
        value={newUser.billingAddress}
        onChange={handleInputChange}
        placeholder="Billing Address"
        required
      />
      <input
        type="text"
        name="shippingAddress"
        value={newUser.shippingAddress}
        onChange={handleInputChange}
        placeholder="Shipping Address"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
