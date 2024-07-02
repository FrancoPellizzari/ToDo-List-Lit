import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, query } from 'lit/decorators.js';

@customElement('create-task-page')
export class CreateTaskPage extends LitElement {
  pageController = new PageController(this);

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  @query("#taskName")
   taskName!: HTMLInputElement
  
  @query("#selectTask")
  selectTask!: HTMLSelectElement

  @query("#descriptionTask")
  descriptionTask!: HTMLTextAreaElement
  
  
  async createTask(event: Event){
    event.preventDefault();
    
    const taskData = {
      title: this.taskName.value,
      type: this.selectTask.value,
      description: this.descriptionTask.value
    };

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        console.log('Task created successfully');
        this.pageController.navigate('/tasks'); 
      } else {
        console.error('Failed to create task', response.statusText);
      }
    } catch (error) {
      console.error('Error creating task', error);
    }
  }
  
  render() {
    return html`
      <h1>CREATE TASK PAGE</h1>
      <form @submit="${this.createTask}">
        <input type="text" id="taskName" placeholder="Titulo de la tarea" required>
        <br><br>
        <select id="selectTask" required>
          <option value="mantenimiento">Mantenimiento</option>
          <option value="limpieza">Limpieza</option>
          <option value="recados">Recados</option>
        </select>
        <br><br>
        <textarea id="descriptionTask" rows="4" cols="50" placeholder="Descripción de la tarea" required></textarea>
        <br><br>
        <button type="submit">Crear Tarea</button> 
      </form>
      <br>

      <button @click="${() => this.pageController.navigate('tasks')}">Visualizar Tareas</button>
    `;
  }
}

//PASOS A SEGUIR
/*
PASO 1: Terminar el formulario (crear inputs, usar querys)
PASO 2: Guardar inputs en una variable como hicimos antes .value 
PASO 3: crear variable const task (que sea un objeto con los valores de los inputs)
PASO 4: guardarlo en el json-server mediante una llamada http post en la ruta /task
En caso de no poder, guardarlo en localStorage
RECORDAR QUE CADA TAREA NECESITA UN ID.
*/