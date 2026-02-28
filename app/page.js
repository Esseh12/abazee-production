'use client';

import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';
import ReservationForm from '@/app/components/Forms/ReservationForm';

const PREV_EVENTS = [
	{ src: '/girl-sitting.jpeg', alt: 'On set' },
	{ src: '/man-showing.jpeg', alt: 'Camera workshop' },
	{ src: '/image-1.jpeg', alt: 'Color grading session' },
	{ src: '/image-2.jpeg', alt: 'Panel discussion' },
	{ src: '/image-3.jpeg', alt: 'Behind the scenes' },
];

export default function Home() {
	const [mounted, setMounted] = useState(false);
	const [current, setCurrent] = useState(0);
	const [offset, setOffset] = useState(0);
	const slideRef = useRef(null);
	const dragStart = useRef(null);
	const total = PREV_EVENTS.length;

	useEffect(() => setMounted(true), []);

	// Recalculate pixel offset whenever current or window size changes
	const recalc = useCallback(() => {
		if (slideRef.current) {
			const w = slideRef.current.getBoundingClientRect().width;
			setOffset(current * w);
		}
	}, [current]);

	useEffect(() => {
		recalc();
		window.addEventListener('resize', recalc);
		return () => window.removeEventListener('resize', recalc);
	}, [recalc]);

	// Auto-advance
	useEffect(() => {
		const t = setInterval(() => setCurrent((c) => (c + 1) % total), 4500);
		return () => clearInterval(t);
	}, [total]);

	const prev = () => setCurrent((c) => (c - 1 + total) % total);
	const next = () => setCurrent((c) => (c + 1) % total);

	const onDragStart = (e) => {
		dragStart.current =
			e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
	};
	const onDragEnd = (e) => {
		if (dragStart.current === null) return;
		const end = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
		const diff = dragStart.current - end;
		if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
		dragStart.current = null;
	};

	return (
		<>
			<main className='fb min-h-screen bg-[#080808] text-white overflow-x-hidden'>
				{/* ══════════════ HERO — centered ══════════════ */}
				<section className='relative min-h-screen flex flex-col'>
					<div className='grain-layer' />
					<div
						className='absolute inset-0 pointer-events-none'
						style={{
							background:
								'radial-gradient(ellipse 70% 45% at 50% 30%,rgba(245,158,11,.05) 0%,transparent 70%)',
						}}
					/>

					<nav className='relative z-10 flex items-center justify-end px-5 sm:px-8 lg:px-14 pt-7 sm:pt-9 mb-14'>
						<div className='flex items-center gap-3 sm:gap-5'>
							<span className='hidden sm:inline text-[11px] uppercase tracking-[0.22em] text-zinc-500'>
								12 &amp; 13 March
							</span>
							<a
								href='#rsvp'
								className='text-[11px] sm:text-xs uppercase tracking-[0.18em] border border-amber-500 text-amber-400
                  px-4 sm:px-5 py-2 sm:py-2.5 hover:bg-amber-500 hover:text-black transition-colors font-semibold rounded-sm'>
								RSVP
							</a>
						</div>
					</nav>

					<div
						className={`relative z-10 flex flex-col items-center justify-center text-center
            flex-1 px-5 sm:px-12 pb-24 pt-10 sm:pt-0 ${mounted ? '' : 'opacity-0'}`}>
						<p className='afu1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-amber-400 mb-6'>
							Sony Alpha × Abazee Production — 2026
						</p>

						<h1
							className='fd afu2 leading-[0.9] text-white mb-6'
							style={{ fontSize: 'clamp(5rem,16vw,12rem)' }}>
							Frame
							<br />
							<span className='text-amber-400'>Every</span>
							<br />
							Moment.
						</h1>

						<div className='afu3 w-14 h-px bg-amber-500 mb-7' />

						<p className='afu3 text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed mb-8'>
							An exclusive two-day event for cinematographers, DOPs, and visual
							storytellers. Limited seats across both sessions.
						</p>

						<div className='afu4 flex flex-wrap justify-center gap-3 mb-10'>
							{['12th March', '13th March'].map((d) => (
								<span
									key={d}
									className='inline-flex items-center gap-2 text-xs sm:text-sm border border-zinc-700
                    text-zinc-300 rounded-full px-5 py-2 font-medium tracking-wide'>
									<span className='w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0' />
									{d}
								</span>
							))}
						</div>

						<a
							href='#rsvp'
							className='afu5 inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400
                text-black font-semibold text-sm uppercase tracking-[0.18em] px-8 py-4 rounded-sm transition-colors'>
							Secure Your Spot
							<svg
								width='14'
								height='14'
								viewBox='0 0 14 14'
								fill='none'>
								<path
									d='M1 7h12M7 1l6 6-6 6'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</a>
					</div>

					<div className='scroll-anim absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2'>
						<span className='text-[9px] uppercase tracking-[0.3em] text-zinc-600'>
							Scroll
						</span>
						<div className='scroll-line w-px h-7 bg-gradient-to-b from-zinc-600 to-transparent' />
					</div>
				</section>

				{/* ══════════════ TAGLINE ══════════════ */}
				<section className='px-5 sm:px-8 lg:px-14 py-14 sm:py-20'>
					<div className='grid sm:grid-cols-2 gap-8 sm:gap-12 items-end'>
						<h2
							className='fd text-white leading-tight'
							style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)' }}>
							BUILT FOR THE
							<br />
							<span className='text-amber-400'>PROFESSIONALS</span>
							<br />
							BEHIND THE LENS.
						</h2>
						<p className='text-zinc-400 text-sm sm:text-base leading-relaxed sm:ml-auto max-w-sm'>
							Whether you&apos;re matching alpha mirrorless bodies to a cinema
							camera or dialling in your color pipeline — this event is crafted
							for professionals who demand more from their gear and their craft.
						</p>
					</div>
				</section>

				{/* ══════════════ RSVP FORM ══════════════ */}
				<section
					id='rsvp'
					className='relative py-16 sm:py-24'>
					{/* <div className='h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-16 sm:mb-20' /> */}

					<div className='px-5 sm:px-8'>
						<div className='max-w-2xl mx-auto'>
							<div className='text-center mb-10 sm:mb-14'>
								<p className='text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400 mb-3'>
									Secure Your Seat
								</p>
								<h2
									className='fd text-white mb-3'
									style={{ fontSize: 'clamp(3rem,8vw,5.5rem)' }}>
									RSVP
								</h2>
								<p className='text-zinc-500 text-sm max-w-sm mx-auto'>
									Fill in your details below. We&apos;ll confirm your spot via
									email.
								</p>
							</div>
							<div
								className='bg-zinc-950/60 border border-zinc-800/60 rounded-2xl p-6 sm:p-10'
								style={{ boxShadow: '0 32px 80px rgba(0,0,0,.5)' }}>
								<ReservationForm />
							</div>
						</div>
					</div>

					<div className='h-px w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mt-16 sm:mt-20' />
				</section>

				{/* ══════════════ CAROUSEL ══════════════ */}
				<section className='py-16 sm:py-24'>
					{/* Header */}
					<div className='px-5 sm:px-8 lg:px-14 flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 sm:mb-12'>
						<div>
							<p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400 mb-2'>
								— The Archive
							</p>
							<h3
								className='fd text-white leading-tight'
								style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
								FROM OUR
								<br />
								PREVIOUS EVENTS
							</h3>
						</div>

						<div className='flex items-center gap-5'>
							{/* Dot indicators */}
							<div className='flex gap-2 items-center'>
								{PREV_EVENTS.map((_, i) => (
									<button
										key={i}
										onClick={() => setCurrent(i)}
										className={`h-0.5 rounded-full transition-all duration-300 cursor-pointer ${
											i === current ? 'bg-amber-400 w-8' : (
												'bg-zinc-700 w-3 hover:bg-zinc-500'
											)
										}`}
									/>
								))}
							</div>

							{/* Counter + arrows */}
							<div className='flex items-center gap-3'>
								<span className='text-xs text-zinc-600 tabular-nums tracking-widest select-none'>
									{String(current + 1).padStart(2, '0')}&nbsp;/&nbsp;
									{String(total).padStart(2, '0')}
								</span>
								{[
									{ fn: prev, path: 'M9 1L3 7l6 6' },
									{ fn: next, path: 'M3 1l6 6-6 6' },
								].map(({ fn, path }, i) => (
									<button
										key={i}
										onClick={fn}
										className='w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center
                      text-zinc-400 hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer'>
										<svg
											width='11'
											height='11'
											viewBox='0 0 12 12'
											fill='none'>
											<path
												d={path}
												stroke='currentColor'
												strokeWidth='1.5'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Carousel viewport */}
					<div
						className='overflow-hidden pl-5 sm:pl-8 lg:pl-14 cursor-grab active:cursor-grabbing'
						onMouseDown={onDragStart}
						onMouseUp={onDragEnd}
						onMouseLeave={onDragEnd}
						onTouchStart={onDragStart}
						onTouchEnd={onDragEnd}>
						{/* Track — shifts by measured pixel offset */}
						<div
							className='flex'
							style={{
								transform: `translateX(-${offset}px)`,
								transition: 'transform .55s cubic-bezier(.23,1,.32,1)',
								willChange: 'transform',
							}}>
							{PREV_EVENTS.map(({ src, alt }, i) => (
								<div
									key={i}
									ref={i === 0 ? slideRef : null}
									className='c-slide flex-shrink-0'>
									<div
										className='c-img relative overflow-hidden rounded-2xl bg-zinc-900 group'
										style={{
											aspectRatio: '3/4',
											boxShadow: '0 8px 40px rgba(0,0,0,.6)',
										}}>
										<Image
											src={src}
											alt={alt}
											fill
											className='object-cover transition-transform duration-700 group-hover:scale-105'
											sizes='(max-width:640px) 82vw, (max-width:1024px) 50vw, 35vw'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
										<p
											className='absolute bottom-0 left-0 right-0 px-5 pb-5
                      text-[10px] uppercase tracking-[0.25em] text-zinc-300 font-medium
                      translate-y-1 group-hover:translate-y-0 transition-transform duration-300'>
											{alt}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ══════════════ FOOTER ══════════════ */}
				<footer
					className='border-t border-zinc-900 px-5 sm:px-8 lg:px-14 py-8 sm:py-10
          flex flex-col sm:flex-row items-center justify-between gap-5'>
					<p className='text-[11px] text-zinc-700 tracking-wide text-center sm:text-right'>
						Sony Alpha × Abazee Production 2026 &nbsp;·&nbsp; 12 &amp; 13 March
						&nbsp;·&nbsp; All rights reserved.
					</p>
				</footer>
			</main>
		</>
	);
}
