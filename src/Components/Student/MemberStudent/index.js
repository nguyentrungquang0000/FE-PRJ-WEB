import { Row, Col, Table } from "antd";
import { useEffect, useState } from "react";
import { instance } from "../../../apis/instance";
import { useParams } from "react-router-dom";


export function MemberStudent() {
  const {id} = useParams();
  const [members, setMembers] = useState([]);
  useEffect(()=>{
    const fetchData = async () =>{
      const res = await instance.get(`/class/${id}/member`);
      console.log(res.data);
      setMembers(res.data.data.content);
    }
    fetchData();
  },[])

	const columns = [
		{
			title: 'Họ tên',
			dataIndex: 'studentName',
			key: 'studentName',
		},
		{
			title: 'Giới tính',
			dataIndex: 'sex',
			key: 'sex',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			key: 'phone',
		}
	]



  return (
    <div>
			<Table columns={columns} dataSource={members} />
    </div>
  );
}
