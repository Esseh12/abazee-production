'use client';

export default function TextareaInput({
	label,
	name,
	value,
	onChange,
	required,
	placeholder = '',
}) {
	return (
		<div className='flex flex-col gap-2'>
			<label className='text-xs font-semibold uppercase tracking-widest text-zinc-400'>
				{label}
				{required && <span className='text-amber-500 ml-1'>*</span>}
			</label>
			<textarea
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				placeholder={placeholder}
				rows={3}
				className='bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 text-sm
          placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1
          focus:ring-amber-500/30 transition-colors w-full resize-none'
			/>
		</div>
	);
}
