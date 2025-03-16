import { Menu } from "antd";
import HomeTeach from "../Components/HomeTeach";
import AssignmentMana from "../Components/Management/AssignmentMana";
import LectureMana from "../Components/Management/LectureMana";
import MemberMana from "../Components/MemberMana";
import LayoutTeach from "../Layout/LayoutTeach";
import CreateAssignment from "../Page/CreateAssignment";
import PageLogin from "../Page/PageLogin";
import MenuStu from "../Components/MenuStu";
import LayoutStu from "../Layout/LayoutStu";
import HomeClass from "../Page/HomeClass";
import Profile from "../Page/Profile";
import AssignmentDetail from "../Page/AssignmentDetail";

import AssignmentSubmiss from "../Page/AssignmentSubmiss";
import VideoPlayer from "../Page/LectureView";
import { MemberStudent } from "../Components/Student/MemberStudent";
import { AssignmentStudent } from "../Components/Student/AssignmentStudent";
import { LectureStudent } from "../Components/Student/LectureStudent";
import { QuizzMana } from "../Components/Management/QuizzMana";
import Scoreboard from "../Components/Scoreboard";
import { SettingMana } from "../Components/Management/SettingMana";
import { QuizzStu } from "../Components/Student/QuizzStu";
import { CreateQuizz } from "../Page/CreateQuizz";
export const routes = [
  {
    path: "/",
    element: <LayoutTeach/>,
    children: [
      {
        path: "/",
        element: <HomeTeach/>
      },
      {
        path: "/member-mana",
        element: <MemberMana/>
      },
      {
        path: "/assignment-mana",
        element: <AssignmentMana/>
      },
      {
        path: "/lecture-mana",
        element: <LectureMana/>
      },
      {
        path: "/quizz-mana",
        element: <QuizzMana/>
      },
      {
        path: "/setting-mana",
        element: <SettingMana/>
      },
    ]
  },
  {
    path: "/login",
    element: <PageLogin/>
  },
  {
    path: "/create-ass",
    element: <CreateAssignment/>
  },
  
  {
    path: "/menu-stu",
    element: <MenuStu/>
  },
  {
    path: "/class",
    element: <HomeClass/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/home-stu",
    element: <LayoutStu/>,
    children: [
      {
        path: "member-stu",
        element: <MemberStudent/>
      },
      {
        path: "ass-stu",
        element: <AssignmentStudent/>
      },
      {
        path: "lecture-stu",
        element: <LectureStudent/>
      },
      {
        path: "quizz-stu",
        element: <QuizzStu/>
      },
      
    ]
  },
  {
    path: "/assignment-detail",
    element: <AssignmentDetail/>
  },
  {
    path: "/assignment-submiss",
    element: <AssignmentSubmiss/>
  },
  {
    path: "/scoreboard",
    element: <Scoreboard/>
  },
  {
    path: "/quizz-crea",
    element: <CreateQuizz/>
  },
  
]
