import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const AddMovieForm = (props) => {
    const { push } = useHistory();

    const [formValues, setFormValues] = useState({
        title: '',
        director: '',
        genre: '',
        metascore: '',
        description: ''
    })

    const handleChange = evt => {
        setFormValues({ ...formValues, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        axios.post('http://localhost:9000/api/movies', formValues)
            .then(res => {
                props.setMovies(res.data)
                push('/movies');
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div className="col">
			<div className="modal-content">
				<form onSubmit={handleSubmit}>
					<div className="modal-header">						
						<h4 className="modal-title">Add new Movie</h4>
					</div>
					<div className="modal-body">					
						<div className="form-group">
							<label>Title</label>
							<input 
                                name="title" 
                                type="text" 
                                className="form-control"
                                onChange={handleChange}
                            />
						</div>
						<div className="form-group">
							<label>Director</label>
							<input onChange={handleChange} name="director" type="text" className="form-control"/>
						</div>
						<div className="form-group">
							<label>Genre</label>
							<input onChange={handleChange} name="genre" type="text" className="form-control"/>
						</div>
						<div className="form-group">
							<label>Metascore</label>
							<input onChange={handleChange} name="metascore" type="number" className="form-control"/>
						</div>		
						<div className="form-group">
							<label>Description</label>
							<textarea onChange={handleChange} name="description" className="form-control"></textarea>
						</div>
										
					</div>
					<div className="modal-footer">			    
						<input type="submit" className="btn btn-info" value="Save"/>
						<Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
					</div>
				</form>
			</div>
		</div>
    )
}

export default AddMovieForm;
