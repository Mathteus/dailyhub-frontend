'use client';
import { useState } from 'react';
import Kanban from './kaban';
import SelectDate from './select-date';

interface IInside {
	show: boolean;
	date: string;
}

function startInside(): IInside {
	return {
		show: true,
		date: new Date().toString().substring(0, 10),
	};
}

export default function Tasks() {
	const [inside, changeInside] = useState<IInside>(startInside());

	if (inside.show) {
		return <SelectDate />;
	}

	return <Kanban date={inside.date} />;
}
