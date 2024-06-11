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
    console.log("values : ",values)
    try {
      setSessionStorage(
        JSON.stringify({
          status: "authenticated",
          data: {
            token: "xzy",
            expires_at: 123232,
            user_info: {
              username: "user",
              status: true
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

  useEffect(()=>{
    setSessionStorage(
      JSON.stringify({
        status: "unauthenticated",
        data: {
          token: "",
          expires_at: 0,
          user_info: {
            username: "",
            status: true
          }
        },
      })
    );
  },[])
  return (
    <div
      className=" bg-gray-100 p-2 rounded-[10px]"
    >
      <Form
        layout='vertical'
        onFinish={onSubmit}
      >
        <Form.Item label="Username" name={"username"}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name={"password"}>
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default UserAuthForm