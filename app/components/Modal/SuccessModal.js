import { X, CheckCircle } from 'lucide-react';

export default function SuccessModal({ isOpen, onClose }) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
			<div className='bg-zinc-900 border border-zinc-700 p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl'>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-full p-2 transition-colors cursor-pointer'>
					<X size={18} />
				</button>

				<div className='mb-6 mt-4 flex justify-center'>
					<div className='w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center'>
						<CheckCircle className='w-8 h-8 text-amber-400' />
					</div>
				</div>

				<h2 className='text-2xl font-bold mb-2 text-white tracking-tight'>
					You&apos;re In.
				</h2>
				<p className='text-zinc-400 mb-2 text-sm'>
					Your RSVP has been confirmed. Check your inbox for a confirmation
					email.
				</p>
				<p className='text-zinc-500 text-xs mb-8'>See you there.</p>

				<button
					onClick={onClose}
					className='bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors w-full cursor-pointer'>
					Close
				</button>
			</div>
		</div>
	);
}
