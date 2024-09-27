import { $authHost } from '../axios.instances';

class Reward {
	#host = $authHost;
}

export default new Reward();
