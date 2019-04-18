import * as nsfwjs from 'nsfwjs';

console.log(self)
onmessage = function (event) {
  console.log('worker get message: ', event.data)
  const taskType = event.data.type;
  const taskMessage = event.data.message;
  switch (taskType) {
    case 'nsfwjs_task_start':
      console.log('----------------')
      nsfwjs.load('/assets/model/').then(model => {
        this.model = model;
        console.log('worker model: ', model)
        postMessage({
          type: 'nsfwjs_tast_init_ok',
          message: JSON.stringify(model),
        });
      });
      break;
    case 'nsfwjs_task_dealimg':
      console.log('nsfwjs_task_dealimg');
      this.model.classify(taskMessage).then(res => {
        console.log(res)
        postMessage({
          type: 'nsfwjs_tast_result',
          message: res,
        });
      })
      break;
    default:
      console.log('===============')
      break;
  }
}
