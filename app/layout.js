import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartan = Plus_Jakarta_Sans({
	subsets: ['latin'],
});

export const metadata = {
	title: 'Sony Venice 2 Masterclass Registration',
	description:
		'Join us for an exclusive hands-on experience with the Sony Venice 2. Register now to secure your spot at this exciting event!',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={plusJakartan.className}>{children}</body>
		</html>
	);
}
