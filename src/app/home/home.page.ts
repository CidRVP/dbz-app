import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DbzService, DragonBallCharacter } from '../services/dbz.service';
import { PowerLevelPipe } from '../pipes/power-level-pipe';
import { GlowDirective } from '../directives/glow.directive';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    PowerLevelPipe,
    GlowDirective
  ]
})
export class HomePage implements OnInit {
  private dbzService = inject(DbzService);
  private router = inject(Router);

  characters: DragonBallCharacter[] = [];
  filteredCharacters: DragonBallCharacter[] = [];
  loading = false;
  error: string | null = null;
  totalCharacters = 0;

  ngOnInit() {
    this.loadAllCharacters();
  }

  formatKi(ki: any): string {
  if (ki === null || ki === undefined || ki === '') {
    return '0';
  }

  const kiString = String(ki);
  const cleanKi = kiString.replace(/[^\d.,]/g, '');
  const normalizedKi = cleanKi.replace(',', '.');
  
  const kiValue = parseFloat(normalizedKi);
  
  if (isNaN(kiValue)) {
    return kiString;
  }

  if (kiValue === 0) return '0';
  if (kiValue >= 1000000) return (kiValue / 1000000).toFixed(1) + 'M';
  if (kiValue >= 1000) return (kiValue / 1000).toFixed(1) + 'K';
  
  return kiValue % 1 === 0 ? kiValue.toString() : kiValue.toFixed(2);
}

  loadAllCharacters() {
    this.loading = true;
    this.error = null;

    this.dbzService.getAllCharacters().subscribe({
      next: (characters) => {
        this.characters = characters;
        this.filteredCharacters = [...this.characters];
        this.totalCharacters = characters.length;
        this.loading = false;
        console.log(`Carregados ${this.totalCharacters} personagens:`, this.characters);
      },
      error: (err) => {
        console.error('Erro completo:', err);
        this.error = 'Erro ao carregar personagens. Tente recarregar a página.';
        this.loading = false;
      }
    });
  }

  filterCharacters(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredCharacters = [...this.characters];
      return;
    }

    this.filteredCharacters = this.characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm) ||
      (character.race && character.race.toLowerCase().includes(searchTerm)) ||
      (character.affiliation && character.affiliation.toLowerCase().includes(searchTerm))
    );
  }

  goToCharacterDetails(characterId: number) {
    this.router.navigate(['/character', characterId]);
  }

  handleImageError(event: any, character: DragonBallCharacter) {
    console.error('Erro ao carregar imagem para:', character.name);
    event.target.src = 'https://via.placeholder.com/80x80/FF6B00/FFFFFF?text=DBZ';
  }

  // Método para recarregar os personagens
  reloadCharacters() {
    this.loadAllCharacters();
  }
}
  