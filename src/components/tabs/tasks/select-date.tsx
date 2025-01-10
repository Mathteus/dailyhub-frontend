import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

interface ICalendar {
	changeDate: (newDate: string) => void;
}

export default function SelectDate({ changeDate }: ICalendar) {
	const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
		alert(`${value.format('YYYY-MM-DD')} ${JSON.stringify(mode)}`);
	};

	const onChangeCalendar = (value: Dayjs) => {
		changeDate(value.format('YYYY-MM-DD'));
	};

	return (
		<section>
			<Calendar onPanelChange={onPanelChange} onSelect={onChangeCalendar} />
		</section>
	);
}
