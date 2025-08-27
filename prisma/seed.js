const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Verificar se já existem moedas no banco de dados
    const moedasCount = await prisma.moeda.count();
    
    // Se não existirem moedas, criar as moedas padrão
    if (moedasCount === 0) {
      console.log('Criando moedas padrão...');
      await prisma.moeda.createMany({
        data: [
          { nome: 'Moeda de 5', valor: 5, quantidade: 0 },
          { nome: 'Moeda de 10', valor: 10, quantidade: 0 },
          { nome: 'Moeda de 15', valor: 15, quantidade: 0 }
        ]
      });
      console.log('Moedas padrão criadas com sucesso!');
    } else {
      console.log('Moedas já existem no banco de dados.');
    }

    // Verificar se já existe um saldo no banco de dados
    const saldoCount = await prisma.saldo.count();
    
    // Se não existir saldo, criar um saldo inicial de 0
    if (saldoCount === 0) {
      console.log('Criando saldo inicial...');
      await prisma.saldo.create({
        data: { valor: 0 }
      });
      console.log('Saldo inicial criado com sucesso!');
    } else {
      console.log('Saldo já existe no banco de dados.');
    }

    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();