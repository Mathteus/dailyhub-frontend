'use client';
import { useState } from 'react';
import SelectDate from '@/components/select-date';
import { useTaskStorage } from '@/storage/task';
import Payment from './payments';

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
	const taskStorage = useTaskStorage.getState();

	const gotoCalendar = () => {
		changeInside(startInside());
	}

	const handlerChangeDate = (newDate: string) => {
		taskStorage.clearTasks();
		taskStorage.setDay(newDate);
		changeDate(newDate);
		changeInside({
			show: true,
			date: newDate,
		});
	}

	if (inside.show) {
		return <Payment back={gotoCalendar} />;
	}

	return <SelectDate type='year' changeDate={handlerChangeDate} />;
}
