import React, {useState} from 'react';

import Header from 'components/header';
import TaskList from 'components/taskList';
import PlusButton from 'components/plusButton';
import Form from 'components/form';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false)

  
  return (
    <main className="container relative bg-blue-900 mx-auto max-w-lg p-4 box-border min-h-screen">
      <Header />
      <TaskList />
      <Form inProp={showForm} onClose={() => setShowForm(false)} />
      <PlusButton onClick={() => setShowForm(!showForm)} />
    </main>
  );
};

export default App
