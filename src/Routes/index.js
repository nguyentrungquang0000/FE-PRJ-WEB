import HomeTeach from "../Components/HomeTeach";
import AssignmentMana from "../Components/Management/AssignmentMana";
import LectureMana from "../Components/Management/LectureMana";
import { QuizzMana } from "../Components/Management/QuizzMana";
import { SettingMana } from "../Components/Management/SettingMana";
import MemberMana from "../Components/MemberMana";
import MenuStu from "../Components/MenuStu";
import Scoreboard from "../Components/Scoreboard";
import AssignmentDetailStu from "../Components/Student/AssignmentDeteailaStu";
import { AssignmentStudent } from "../Components/Student/AssignmentStudent";
import { LectureStudent } from "../Components/Student/LectureStudent";
import { MemberStudent } from "../Components/Student/MemberStudent";
import { QuizStu } from "../Components/Student/QuizzStu";
import { QuizList } from "../Components/Student/QuizzStu/QuizList";
import { QuizResultChart } from "../Components/Student/QuizzStu/Result";
import LayoutStu from "../Layout/LayoutStu";
import LayoutTeach from "../Layout/LayoutTeach";
import AssignmentDetail from "../Page/AssignmentDetail";
import AssignmentSubmiss from "../Page/AssignmentSubmiss";
import CreateAssignment from "../Page/CreateAssignment";
import { CreateQuizz } from "../Page/CreateQuizz";
import HomeClass from "../Page/HomeClass";
import PageLogin from "../Page/PageLogin";
import Profile from "../Page/Profile";
export const routes = [
	{
		path: "/class/:id",
		element: <LayoutTeach />,
		children: [
			{
				path: "",
				element: <HomeTeach />,
			},
			{
				path: "member-mana",
				element: <MemberMana />,
			},
			{
				path: "assignment-mana",
				element: <AssignmentMana />,
			},
			{
				path: "assignment/:assId",
				element: <AssignmentSubmiss />,
			},
			{
				path: "lecture-mana",
				element: <LectureMana />,
			},
			{
				path: "quizz-mana",
				element: <QuizzMana />,
			},
			{
				path: "quizz-crea",
				element: <CreateQuizz />,
			},
			{
				path: "setting-mana",
				element: <SettingMana />,
			},
			{
				path: "scoreboard",
				element: <Scoreboard />,
			},
			{
				path: "create-ass",
				element: <CreateAssignment />,
			},
			{
				path: "assignment-detail",
				element: <AssignmentDetail />,
			},
		],
	},
	{
		path: "/login",
		element: <PageLogin />,
	},
	
	{
		path: "/menu-stu",
		element: <MenuStu />,
	},
	{
		path: "/class",
		element: <HomeClass />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "stu/class/:id",
		element: <LayoutStu />,
		children: [
			{
				path: "",
				element: <HomeTeach />,
			},
			{
				path: "member-stu",
				element: <MemberStudent />,
			},
			{
				path: "ass-stu",
				element: <AssignmentStudent />,
			},
			{
				path: "lecture-stu",
				element: <LectureStudent />,
			},
			{
				path: "quizz-stu",
				element: <QuizList />
			},
			{
				path: ":id",
				element: <QuizStu />
			},
			{
				path: "result/:id",
				element: <QuizResultChart />
			},
			{
				path: "assignment-detail-stu",
				element: <AssignmentDetailStu/>
			},
		],
	},
	
	
	
	
];
