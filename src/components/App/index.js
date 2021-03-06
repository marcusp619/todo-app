import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react'
import NoteForm from '../NoteForm/';
import NoteList from '../NoteList/';
import FilterContainer from '../FilterContainer/'
import { getAllNotes, postNote, deleteNote, filteredNotes, filteredDates } from '../../helper/api'

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
    };
  }

  componentDidMount = async () => {
    this.getNotes();
  }

  getNotes = async () => {
    let notes = await getAllNotes()
    this.setState({ notes });
  }

  addNote = async note => {
    const newNote = await postNote(note)
    const notes = [newNote, ...this.state.notes];
    this.setState({ notes });
  };

  removeNote = async id => {
    const notes = this.state.notes.filter(note => note.id !== id);
    await deleteNote(id);
    this.setState({ notes });
  };

  filterNotes = async category => {
    const notes = await filteredNotes(category);
    this.setState({ notes });
  }

  filterDates = async date => {
    const notes = await filteredDates(date)
    this.setState({ notes })
  }

  render() {
    return (
      <Container>
        <Header size='huge'>Note App</Header>
        <Container style={containerStyle}>
          <NoteForm addNote={this.addNote} />
          <FilterContainer filterNotes={this.filterNotes} filterDates={this.filterDates} getNotes={this.getNotes} />
        </Container>
        <NoteList notes={this.state.notes} removeNote={this.removeNote} />
      </Container>
    );
  }
}

const containerStyle = {
  boxShadow: 'rgb(204, 204, 204) 0px 1px 2px',
}

export default App;
