'use client';
import { useEffect, useState } from 'react';
import Kanban from './kaban';
import SelectDate from './select-date';

interface IInside {
	show: boolean;
	date: string;
}

function startInside(): IInside {
	return {
		show: false,
		date: new Date().toString().substring(0, 10),
	};
}

export default function Tasks() {
	const [date, changeDate] = useState<string>();
	const [inside, changeInside] = useState<IInside>(startInside());

	const gotoCalendar = () => {
		changeInside(startInside());
	}

	const handlerChangeDate = (newDate: string) => {
		changeDate(newDate);
		changeInside({
			show: true,
			date: newDate,
		});
	}

	if (inside.show) {
		return <Kanban date={inside.date} back={gotoCalendar} />;
	}

	return <SelectDate changeDate={handlerChangeDate} />;
}
