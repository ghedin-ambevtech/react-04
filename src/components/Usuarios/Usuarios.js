import React, { useState, useEffect } from 'react'

import AdicionarUsuario from '../AdicionarUsuario/AdicionarUsuario'
import Usuario from '../Usuario/Usuario'

function Usuarios (props) {
  
  const [usuarios, setUsuarios] = useState([])
  
  useEffect(()=>{
      console.log('useEffect');
      fetch('https://reqres.in/api/users')
        .then(resposta => resposta.json())
        .then(dados => {
          const usuarios = dados.data.map(usuario => ({
            id: usuario.id,
            nome: usuario.first_name,
            sobrenome: usuario.last_name,
            email: usuario.email
          }))
          setUsuarios(usuarios)
        })
      }, []) //essa array vazia garante que o use effect não gere um looping por aguardar dependencia

  const adicionarUsuario = usuario => {
    //const usuarios = [...this.state.usuarios, usuario]
    setUsuarios(usuariosAtuais => [...usuariosAtuais, usuario]) 
  }

  const removerUsuario = usuario => {
    if (window.confirm(`Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`)) {
      fetch(`https://reqres.in/api/users/${usuario.id}`, {
        method: 'DELETE'
      })
        .then(resposta => {
          if (resposta.ok) {
            setUsuarios(usuarios.filter(x => x.id !== usuario.id))
          }
        })
    }
  }

  console.log('render..');

  return (
      <>
        <AdicionarUsuario adicionarUsuario={adicionarUsuario} />

        {usuarios.map(usuario => (
          <Usuario key={usuario.id}
            usuario={usuario}
            removerUsuario={() => removerUsuario(usuario)}
          />
        ))}
      </>
    )
}

export default Usuarios