import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

type User = { id: string; name: string } | null;

interface AuthContextType {
	user: User;
	isLoading: boolean;
	signIn: (token: string) => Promise<void>;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoading: true,
	signIn: async () => {},
	signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState<User>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	const signIn = async (token: string) => {
		console.log("User signed in with token:", token);
		setUser({ id: "123", name: "Usuário Logado" });
	};

	const signOut = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}
