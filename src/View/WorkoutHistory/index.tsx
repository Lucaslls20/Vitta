import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { 
  Text, 
  Card, 
  Title, 
  Paragraph, 
  Appbar, 
  Divider, 
  Chip, 
  Button, 
  IconButton,
  Searchbar,
  FAB,
  ActivityIndicator
} from 'react-native-paper';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { COLORS } from '../Colors';
import { styles } from './styles';

// Definição de tipos
interface Exercicio {
  id: string;
  nome: string;
  series: number;
  repeticoes: number;
  peso: number;
}

interface Treino {
  id: string;
  data: Date;
  nome: string;
  categoria: string;
  duracao: number; // em minutos
  exercicios: Exercicio[];
  concluido: boolean;
}

const WorkoutHistory = () => {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [filteredTreinos, setFilteredTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);

  // Simulação de dados para exemplo
  useEffect(() => {
    setTimeout(() => {
      const dadosTreinos: Treino[] = [
        {
          id: '1',
          data: new Date(2025, 2, 7),
          nome: 'Treino A - Peito e Tríceps',
          categoria: 'Hipertrofia',
          duracao: 65,
          concluido: true,
          exercicios: [
            { id: '1-1', nome: 'Supino Reto', series: 4, repeticoes: 12, peso: 80 },
            { id: '1-2', nome: 'Crucifixo', series: 3, repeticoes: 15, peso: 14 },
            { id: '1-3', nome: 'Tríceps Corda', series: 4, repeticoes: 12, peso: 25 },
          ]
        },
        {
          id: '2',
          data: new Date(2025, 2, 5),
          nome: 'Treino B - Costas e Bíceps',
          categoria: 'Hipertrofia',
          duracao: 72,
          concluido: true,
          exercicios: [
            { id: '2-1', nome: 'Puxada pela frente', series: 4, repeticoes: 10, peso: 70 },
            { id: '2-2', nome: 'Remada baixa', series: 3, repeticoes: 12, peso: 60 },
            { id: '2-3', nome: 'Rosca direta', series: 3, repeticoes: 12, peso: 15 },
          ]
        },
        {
          id: '3',
          data: new Date(2025, 2, 3),
          nome: 'Treino C - Pernas',
          categoria: 'Força',
          duracao: 80,
          concluido: true,
          exercicios: [
            { id: '3-1', nome: 'Agachamento', series: 5, repeticoes: 8, peso: 100 },
            { id: '3-2', nome: 'Leg Press', series: 4, repeticoes: 10, peso: 200 },
            { id: '3-3', nome: 'Cadeira Extensora', series: 3, repeticoes: 12, peso: 60 },
          ]
        },
        {
          id: '4',
          data: new Date(2025, 2, 1),
          nome: 'Treino Cardio',
          categoria: 'Cardio',
          duracao: 45,
          concluido: true,
          exercicios: [
            { id: '4-1', nome: 'Esteira', series: 1, repeticoes: 1, peso: 0 },
            { id: '4-2', nome: 'Elíptico', series: 1, repeticoes: 1, peso: 0 },
          ]
        },
      ];
      
      setTreinos(dadosTreinos);
      setFilteredTreinos(dadosTreinos);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (searchQuery === '' && filtroCategoria === null) {
      setFilteredTreinos(treinos);
      return;
    }
    
    let filtered = treinos;
    
    if (searchQuery !== '') {
      filtered = filtered.filter(treino => 
        treino.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        treino.categoria.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filtroCategoria !== null) {
      filtered = filtered.filter(treino => treino.categoria === filtroCategoria);
    }
    
    setFilteredTreinos(filtered);
  }, [searchQuery, filtroCategoria, treinos]);

  const formatarData = (data: Date): string => {
    return format(data, "EEEE, dd 'de' MMMM", { locale: ptBR });
  };

  const renderTreinoItem = ({ item }: { item: Treino }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={{ color: COLORS.text.primary }}>{item.nome}</Title>
        <View style={styles.dateContainer}>
          <IconButton icon="calendar" size={20} iconColor={COLORS.text.secondary} />
          <Paragraph style={{ color: COLORS.text.secondary }}>{formatarData(item.data)}</Paragraph>
        </View>
        
        <View style={styles.infoRow}>
          <Chip icon="tag" style={styles.chip}>{item.categoria}</Chip>
          <Chip icon="clock-outline" style={styles.chip}>{item.duracao} min</Chip>
          <Chip 
            icon={item.concluido ? "check-circle" : "close-circle"} 
            style={[styles.chip, { backgroundColor: item.concluido ? COLORS.success : COLORS.error }]}
          >
            {item.concluido ? 'Concluído' : 'Não concluído'}
          </Chip>
        </View>
        
        <Divider style={styles.divider} />
        <Paragraph style={[styles.exerciciosTitle, { color: COLORS.text.primary }]}>Exercícios:</Paragraph>
        
        {item.exercicios.map((exercicio) => (
          <View key={exercicio.id} style={styles.exercicioItem}>
            <Text style={[styles.exercicioNome, { color: COLORS.text.primary }]}>{exercicio.nome}</Text>
            <Text style={{ color: COLORS.text.secondary }}>
              {exercicio.series} x {exercicio.repeticoes} {exercicio.peso > 0 ? `• ${exercicio.peso}kg` : ''}
            </Text>
          </View>
        ))}
      </Card.Content>
      
      <Card.Actions style={styles.cardActions}>
        <Button icon="repeat" color={COLORS.primary}>Repetir treino</Button>
        <Button icon="pencil" color={COLORS.primary}>Editar</Button>
      </Card.Actions>
    </Card>
  );

  const limparFiltros = () => {
    setSearchQuery('');
    setFiltroCategoria(null);
  };

  const categorias = Array.from(new Set(treinos.map(treino => treino.categoria)));

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: COLORS.white }}>
        <Appbar.BackAction onPress={() => console.log('Voltar')} iconColor={COLORS.primary} />
        <Appbar.Content title="Histórico de Treinos" titleStyle={{color:COLORS.primary}} />
        <Appbar.Action icon="calendar-month" onPress={() => console.log('Calendário')} iconColor={COLORS.primary} />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log('Menu')} iconColor={COLORS.primary} />
      </Appbar.Header>
      
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar treinos"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>
      
      <View style={styles.filtrosContainer}>
        <Text style={styles.filtrosLabel}>Filtrar por categoria:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosScroll}>
          {categorias.map((categoria) => (
            <Chip
              key={categoria}
              selected={filtroCategoria === categoria}
              onPress={() => setFiltroCategoria(filtroCategoria === categoria ? null : categoria)}
              style={styles.filtroChip}
              mode="outlined"
            >
              {categoria}
            </Chip>
          ))}
          {(searchQuery !== '' || filtroCategoria !== null) && (
            <Chip
              icon="close"
              onPress={limparFiltros}
              style={styles.filtroChip}
              mode="outlined"
            >
              Limpar filtros
            </Chip>
          )}
        </ScrollView>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando histórico de treinos...</Text>
        </View>
      ) : filteredTreinos.length > 0 ? (
        <FlatList
          data={filteredTreinos}
          renderItem={renderTreinoItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <IconButton icon="dumbbell" size={50} iconColor={COLORS.gray} />
          <Text style={styles.emptyText}>Nenhum treino encontrado</Text>
          {(searchQuery !== '' || filtroCategoria !== null) && (
            <Button mode="contained" onPress={limparFiltros} style={styles.emptyButton}>
              Limpar filtros
            </Button>
          )}
        </View>
      )}
      
      <FAB
        style={[styles.fab, { backgroundColor: COLORS.accent }]}
        icon="plus"
        label="Novo Treino"
        onPress={() => console.log('Adicionar novo treino')}
      />
    </View>
  );
};

export default WorkoutHistory;
