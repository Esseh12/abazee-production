'use client';

export default function TextInput({
	label,
	name,
	value,
	onChange,
	type = 'text',
	required,
	placeholder = '',
	inputMode,
	pattern,
	title,
}) {
	return (
		<div className='flex flex-col gap-2'>
			<label className='text-xs font-semibold uppercase tracking-widest text-zinc-400'>
				{label}
				{required && <span className='text-amber-500 ml-1'>*</span>}
			</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				placeholder={placeholder}
				inputMode={inputMode}
				pattern={pattern}
				title={title}
				className='bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 text-sm
          placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1
          focus:ring-amber-500/30 transition-colors w-full'
			/>
		</div>
	);
}
