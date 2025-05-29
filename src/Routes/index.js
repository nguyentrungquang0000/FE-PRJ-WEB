import E403 from "../Components/Exceptions/E403.js";
import Error404 from "../Components/Exceptions/E404.js/index.js";
import HomeTeach from "../Components/HomeTeach";
import AssignmentMana from "../Components/Management/AssignmentMana";
import LectureMana from "../Components/Management/LectureMana";
import { QuizDetail } from "../Components/Management/QuizDetail";
import { QuizSubmitMana } from "../Components/Management/QuizSubmitMana";
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
import { SettingStu } from "../Components/Student/SettingStu";
import LayoutStu from "../Layout/LayoutStu";
import LayoutTeach from "../Layout/LayoutTeach";
import AssignmentDetail from "../Page/AssignmentDetail";
import AssignmentSubmiss from "../Page/AssignmentSubmiss";
import CreateAssignment from "../Page/CreateAssignment";
import { CreateQuizz } from "../Page/CreateQuizz";
import { GroupChatPage } from "../Page/GroupChatPage";
import HomeClass from "../Page/HomeClass";
import HomePage from "../Page/HomePage";
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
				path: "assignment/:assId/detail",
				element: <AssignmentDetail />,
			},
			{
				path: "chat",
				element: <GroupChatPage/>,
			},
			{
				path: "quizz-mana/:quizId/submits",
				element: <QuizSubmitMana/>,
			},
			{
				path: "quizz-stu/:quizId/result/:quizSubmitId",
				element: <QuizResultChart/>,
			},

			{
				path: "quizz-mana/:quizId/detail",
				element: <QuizDetail/>,
			},
		],
	},
	
	{
		path: "/menu-stu",
		element: <MenuStu />,
	},
	{
		path: "/error403",
		element: <E403 />,
	},

	{
		path: "/class",
		element: <HomeClass />,
	},
	{
		path: "",
		element: <HomePage/>,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/result",
		element: <QuizResultChart/>,
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
				path: "quizz-stu/:quizId/quiz",
				element: <QuizStu />
			},
			{
				path: "quizz-stu/:quizId/result/:quizSubmitId",
				element: <QuizResultChart/>,
			},
			{
				path: "ass-stu/:assId",
				element: <AssignmentDetailStu/>
			},
			{
				path: "chat",
				element: <GroupChatPage/>,
			},
			{
				path: "setting",
				element: <SettingStu/>,
			},
		],
	},
	{
		path: "*",
		element: <Error404/>,
	},
];
