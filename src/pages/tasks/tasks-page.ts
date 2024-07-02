import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, query, state } from 'lit/decorators.js';

@customElement('tasks-page')
export class TasksPage extends LitElement {
    pageController = new PageController(this);

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    @state()
    /* tasks: object[] = [] */
    tasks: { id: number, title: string, type: string, description: string, tags: string[] }[] = []

    @state()
    editTaskData: { title: string, type: string, description: string  } = { title: '', type: '', description: '' };

    @state()
    editTaskId: number | null = null;





    connectedCallback(): void {
        super.connectedCallback();

        this.getTasks();
    }

    async getTasks() {
        try {
             const response = await fetch('http://localhost:3000/tasks', { 
           
                
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                
            });

            if (response.ok) {
                this.tasks = await response.json();
            }
        } catch (error) {
            console.error('Error creating task', error);
        }
    }

     /* async eliminarObjeto(id) {
       await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el objeto');
          }
          return response.json();
        })
        .then(data => {
          console.log('Objeto eliminado:', data);
          // Aquí puedes agregar código para actualizar la UI si es necesario
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
       */
      async deleteTask(taskId: number) {
        try {
          const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
    
          if (response.ok) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
          }
        } catch (error) {
          console.error('Error deleting task', error);
        }
      }

      async editTask(taskId: number) {
        try {
          const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify(this.editTaskData)
          });
    
          if (response.ok) {
            if (response.ok) {
                const updatedTask = await response.json();
                this.tasks = this.tasks.map(task => task.id === taskId ? updatedTask : task);
                this.editTaskId = null; 
              }
          }
        } catch (error) {
          console.error('Error deleting task', error);
        }
      }
    
      handleEditClick(task: { id: number, title: string, type: string, description: string, tags: string[] }) {
        this.editTaskId = task.id;
      
      }
    
      handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.editTaskData = { ...this.editTaskData, [target.name]: target.value };
      }
    
      render() {
        return html`
          <h1>Visualizar Tareas</h1>
          ${
            this.tasks.length === 0
              ? html`<p>No hay tareas</p>`
              : html`
                <ul>
                  ${this.tasks.map(task => html`
                    <li>
                      ${this.editTaskId === task.id
                        ? html`
                          <form @submit="${(e: Event) => { e.preventDefault(); this.editTask(task.id); }}">
                            <input type="text" name="title" value="${this.editTaskData.title}" @input=${this.handleInputChange} required>
                            <select name="type" value="${this.editTaskData.type}" @click=${this.handleInputChange} required>
                              <option value="mantenimiento">Mantenimiento</option>
                              <option value="limpieza">Limpieza</option>
                              <option value="recados">Recados</option>
                            </select>
                            <textarea name="description" @input=${this.handleInputChange} required>${this.editTaskData.description}</textarea>
                            
                            <button type="submit">Guardar</button>
                          </form>
                        `
                        : html`
                          <p><strong>Title:</strong> ${task.title}</p>
                          <p><strong>Type:</strong> ${task.type}</p>
                          <p><strong>Description:</strong> ${task.description}</p>
                          
                          <button @click=${() => this.handleEditClick(task)}>Editar Tarea</button>
                        `}
                      <button @click=${() => this.deleteTask(task.id)}>Eliminar Tarea</button>
                    </li>
                  `)}
                </ul>

                <br>
                <button @click="${() => this.pageController.navigate('create-task')}">IR a Crear Tareas</button>
                <button @click="${() => this.pageController.navigate('home')}">Go to home page</button>
              `
          }
        `;
      }
    }

/* render() {
        return html`
      <h1>Visualizar Tareas</h1>
      ${
        this.tasks.length === 0
            ? html`No hay tareas`
            : this.tasks.map((currentTask) => html`<p>${currentTask.title}</p>
            <button @click=${() => this.deleteTask(task.id)}>Eliminar Tarea</button>
            
            `)
      }
      
    `;
    }
} */