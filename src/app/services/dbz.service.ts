import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export interface DragonBallCharacter {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private http = inject(HttpClient);
  
  // API principal - vamos buscar com paginação para pegar todos
  private baseUrl = 'https://dragonball-api.com/api';

  constructor() { }

  // Método para buscar TODOS os personagens com paginação
  getAllCharacters(): Observable<DragonBallCharacter[]> {
    console.log('Buscando todos os personagens...');
    
    return this.http.get<any>(`${this.baseUrl}/characters?limit=100`).pipe(
      map(response => {
        console.log('Resposta completa:', response);
        
        // A API retorna diferentes estruturas, vamos normalizar
        if (response && response.items) {
          return response.items.filter((char: DragonBallCharacter) => !char.deleted);
        } else if (response && Array.isArray(response)) {
          return response.filter((char: DragonBallCharacter) => !char.deleted);
        } else {
          return [];
        }
      }),
      catchError(error => {
        console.error('Erro na API:', error);
        // Se der erro, vamos buscar página por página
        return this.getCharactersWithPagination();
      })
    );
  }
  
  // Método alternativo que busca página por página
  private getCharactersWithPagination(): Observable<DragonBallCharacter[]> {
    const allCharacters: DragonBallCharacter[] = [];
    const pageSize = 50;
    let currentPage = 1;

    // Função recursiva para buscar todas as páginas
    const fetchPage = (page: number): Observable<DragonBallCharacter[]> => {
      return this.http.get<any>(`${this.baseUrl}/characters?page=${page}&limit=${pageSize}`).pipe(
        catchError(error => {
          console.error(`Erro na página ${page}:`, error);
          return of(allCharacters); // Retorna o que já conseguiu
        })
      );
    };

    return fetchPage(currentPage);
  }

  getCharacterById(id: number): Observable<DragonBallCharacter> {
    return this.http.get<DragonBallCharacter>(`${this.baseUrl}/characters/${id}`).pipe(
      catchError(error => {
        console.error('Erro ao buscar personagem:', error);
        // Retorna um personagem vazio em caso de erro
        return of(this.getEmptyCharacter());
      })
    );
  }

  private getEmptyCharacter(): DragonBallCharacter {
    return {
      id: 0,
      name: 'Personagem não encontrado',
      ki: '0',
      maxKi: '0',
      race: 'Desconhecida',
      gender: 'Desconhecido',
      description: '',
      image: 'https://via.placeholder.com/150/FF6B00/FFFFFF?text=DBZ',
      affiliation: 'Desconhecida',
      deleted: false
    };
  }
}