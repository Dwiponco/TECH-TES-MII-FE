import { useAuthContext } from "@/store/auth";
import { Button, Form, Input, message } from "antd"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const UserAuthForm = () => {

  const navigate = useNavigate()
  const { setSessionStorage } = useAuthContext()

  const onSubmit = async (
    values: { username: string, password: string }
  ) => {
    const url = import.meta.env.VITE_API_DOMAIN + "/login"
    axios.post(url, values)
      .then(response => {
        setSessionStorage(
          JSON.stringify({
            status: "authenticated",
            data: {
              token: response.data.access_token,
              expires_at: response.data.expires_in,
              user_info: {
                username: "dwiponcoutomo",
                role: "admin",
              }
            },
          })
        );

        message.success("Login Success")
        setTimeout(() => {
          navigate("/dashboard/home");
        }, 1000);
      })
      .catch(error => {
        console.log("error : ", error)
      })
  };

  useEffect(() => {
    setSessionStorage(
      JSON.stringify({
        status: "unauthenticated",
        data: {
          token: "",
          expires_at: 0,
          user_info: {
            username: "",
            role: "",
          }
        },
      })
    );
    localStorage.clear()
  }, [])

  return (
    <div
      className=" bg-[#08448e] p-4 rounded-[10px]"
    >
      <Form
        layout='vertical'
        onFinish={onSubmit}
        className="text-white read"
        requiredMark={false}
        initialValues={{
          username:'admin',
          password:123
        }}
      >
        <Form.Item label={<span className=" text-white">Username</span>} name={"username"} rules={[{ required: true, message: 'Username is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item label={<span className=" text-white">Password</span>} name={"password"} rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item className="flex justify-center mb-0">
          <Button htmlType="submit" className=" items-center">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UserAuthForm