import React,{Component} from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            _id: '',
            tasks: []
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);
        this.getTask = this.getTask.bind(this);
    }
    addTask(e) {
        e.preventDefault();
        let method = 'POST',
            url = '/api/task/',
            msg = 'Tarea Guardada'
        if(this.state._id){
            method = 'PUT'
            url = '/api/task/'+this.state._id
            msg = 'Tarea Actualizada'
        }
        fetch(url, {
            method: method,
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            M.toast({
                html: msg
            })
            this.setState({title: '', description: '',_id: ''})
            this.fetchTasks()
        })
        .catch(err => console.log(err))
        
    }
    getTask(id) {
        fetch('/api/task/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } 
        })
        .then(res => res.json())
        .then(data => {
            const item = data.task;
            this.setState({
                _id: item._id,
                title: item.title,
                description: item.description
            })
        })
    }
    deleteTask(id) {
        if(confirm('¿Seguro que desea borrar?')) {
            fetch('/api/task/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } 
            })
            .then(res => res.json())
            .then(res => {
                M.toast({
                    html: 'Tarea Eliminada'
                })
                this.fetchTasks()
            })
        }
        
    }
    fetchTasks() {
        fetch('/api/task', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data})
            console.log(this.state.tasks)
        })
    }
    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        console.log('componente montado')
        this.fetchTasks()
    }
    render () {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN STACK</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} className="materialize-textarea" placeholder="Task Description" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <button type="submit" className="btn col s12 light-blue darken-4">Send</button>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulos</th>
                                        <th>Descripcion</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(x=> {
                                            return(
                                                <tr key={x._id}>
                                                    <td>{x.title}</td>
                                                    <td>{x.description}</td>
                                                    <td>
                                                        <button onClick={()=>this.getTask(x._id)} className="waves-effect waves-light btn">
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button onClick={()=>this.deleteTask(x._id)} className="waves-effect waves-light btn">
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                            
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default App;