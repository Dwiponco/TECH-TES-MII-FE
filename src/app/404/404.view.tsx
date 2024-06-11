import React from 'react';
import { Button, Result } from 'antd';

export const NotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Maaf, page yang anda tuju tidak ada."
    extra={<Button onClick={() => { window.location.href = '/' }}>Kembali ke dashboard</Button>}
  />
);