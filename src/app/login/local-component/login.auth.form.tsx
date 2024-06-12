import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/store/auth";
import { Button, Form, Input } from "antd"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserAuthForm = () => {
  const { toast } = useToast()

  const navigate = useNavigate()
  const { setSessionStorage } = useAuthContext()

  const onSubmit = async (
    values: { username: string, password: string }
  ) => {
    console.log("values : ", values)
    try {
      setSessionStorage(
        JSON.stringify({
          status: "authenticated",
          data: {
            token: "xzy",
            expires_at: 123232,
            user_info: {
              username: "dwiponcoutomo",
              role: "admin",
            }
          },
        })
      );

      navigate("/dashboard/home");
    }
    catch (_error) {
      toast({
        title: "Failed",
        description: "Please Try again",
      })
    }
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