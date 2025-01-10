import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

export default function SelectDate() {
	const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
		console.log(value.format('YYYY-MM-DD'), mode);
	};

	return (
		<section>
			<Calendar onPanelChange={onPanelChange} />
		</section>
	);
}
