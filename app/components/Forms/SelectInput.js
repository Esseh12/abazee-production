'use client';

export default function SelectInput({
	label,
	name,
	value,
	onChange,
	options,
	required,
	placeholder = 'Select an option',
}) {
	return (
		<div className='flex flex-col gap-2'>
			<label className='text-xs font-semibold uppercase tracking-widest text-zinc-400'>
				{label}
				{required && <span className='text-amber-500 ml-1'>*</span>}
			</label>
			<select
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				className='bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 text-sm
          focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30
          transition-colors w-full appearance-none cursor-pointer'>
				<option
					value=''
					disabled>
					{placeholder}
				</option>
				{options.map((item) => (
					<option
						key={item}
						value={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
}
