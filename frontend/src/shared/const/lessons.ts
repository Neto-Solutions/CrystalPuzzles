const lessons = [
	{
		_id: '66b0cd82c856a75cd22b3b01',
		place: {
			_id: '66b0cce0c856a75cd22b3b00',
			name: 'Спортзал',
			description: ''
		},
		trainer: {
			_id: '669fb4464602ff2db81441f7',
			email: 'trainer@crystal.com',
			password: 'trainerpass',
			firstname: 'Валерия',
			lastname: 'Андреевна',
			surname: 'Вера',
			birthday: '1992-07-14',
			is_man: true,
			contact: '',
			avatar: 6,
			role: 'trainer'
		},
		start: (() => new Date(new Date().setHours(9, 30, 0, 0)).toISOString())(),
		trainer_comment: '',
		checkList: {
			_id: '66b0cd82c856a75cr22b3b00',
			exercises: [
				{
					_id: '66b0cd82c856a75cd22b3b02',
					name: 'Стойка на месте без посторонней помощи',
					img: 1,
					isComplete: true
				},
				{
					_id: '66b0cd82c856a75cd22b3b03',
					name: 'Самостоятельный подъем после падения',
					img: 2,
					isComplete: false
				},
				{
					_id: '66b0cd82c856a75cd22b3b04',
					name: 'Проезд на 2 ногах',
					img: 3,
					isComplete: true
				},
				{
					_id: '66b0cd82c856a75cd22b3b05',
					name: 'Саночки',
					img: 4,
					isComplete: true
				},
				{
					_id: '66b0cd82c856a75cd22b3b06',
					name: 'Змейка вперед',
					img: 5,
					isComplete: false
				}
			]
		}
	},
	{
		_id: '66b0cda8c856a75cd22b3b02',
		place: {
			_id: '66b0cce0c856a75cd22b3b00',
			name: 'Футбольное поле',
			description: ''
		},
		trainer: {
			_id: '669fb4464602ff2db81441f7',
			email: 'trainer@crystal.com',
			password: 'trainerpass',
			firstname: 'Валерия',
			lastname: 'Андреевна',
			surname: 'Вера',
			birthday: '1992-07-14',
			is_man: true,
			contact: '',
			avatar: 6,
			role: 'trainer'
		},
		start: (() => new Date(new Date().setHours(11, 0, 0, 0)).toISOString())(),
		trainer_comment: '',
		checkList: {
			_id: '66b0cd82c856a75cr22b3b00',
			exercises: [
				{
					_id: '66b0cd82c856a75cd22b3b02',
					name: 'Стойка на месте без посторонней помощи',
					img: 1,
					isComplete: false
				},
				{
					_id: '66b0cd82c856a75cd22b3b03',
					name: 'Самостоятельный подъем после падения',
					img: 2,
					isComplete: false
				},
				{
					_id: '66b0cd82c856a75cd22b3b04',
					name: 'Проезд на 2 ногах',
					img: 3,
					isComplete: false
				},
				{
					_id: '66b0cd82c856a75cd22b3b05',
					name: 'Саночки',
					img: 4,
					isComplete: false
				},
				{
					_id: '66b0cd82c856a75cd22b3b06',
					name: 'Змейка вперед',
					img: 5,
					isComplete: false
				}
			]
		}
	},
	{
		_id: '66b0cdacc856a75cd22b3b03',
		place: {
			_id: '66b0cce0c856a75cd22b3b00',
			name: 'Игровая площадка',
			description: ''
		},
		trainer: {
			_id: '669fb4464602ff2db81441f7',
			email: 'trainer@crystal.com',
			password: 'trainerpass',
			firstname: 'Валерия',
			lastname: 'Андреевна',
			surname: 'Вера',
			birthday: '1992-07-14',
			is_man: true,
			contact: '',
			avatar: 6,
			role: 'trainer'
		},
		start: (() => new Date(new Date().setHours(14, 30, 0, 0)).toISOString())(),
		trainer_comment: '',
		checkList: {
			_id: '66b0cd82c856a75cr22b3b00',
			exercises: [
				{
					_id: '66b0cd82c856a75cd22b3b02',
					name: 'Стойка на месте без посторонней помощи',
					img: 1,
					isComplete: false
				},
				{
					_id: '66b0cd82c856a75cd22b3b03',
					name: 'Самостоятельный подъем после падения',
					img: 2,
					isComplete: false
				},
				{
					_id: '66b0cd82c856a75cd22b3b04',
					name: 'Проезд на 2 ногах',
					img: 3,
					isComplete: false
				},
				{
					_id: '66b0cd82c856a75cd22b3b05',
					name: 'Саночки',
					img: 4,
					isComplete: false
				},
				{
					_id: '66b0cd82c856a75cd22b3b06',
					name: 'Змейка вперед',
					img: 5,
					isComplete: false
				}
			]
		}
	}
];

export { lessons };
