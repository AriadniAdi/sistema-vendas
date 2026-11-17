import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/presentation/hooks/useAuth';
import { appMessages } from '../../shared/presentation/constants/appMessages';

const sections = [
  {
    title: appMessages.products,
    description: appMessages.productsDescription,
    path: '/products',
    available: true,
  },
  {
    title: appMessages.customers,
    description: appMessages.customersDescription,
    available: false,
  },
  {
    title: appMessages.sales,
    description: appMessages.salesDescription,
    available: false,
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #123b56 0%, #1e6f8f 100%)', color: 'white' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          {appMessages.welcome}
        </Typography>
        <Typography sx={{ opacity: 0.85 }}>
          {appMessages.userGreeting(user?.email)}
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid key={section.title} size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: 3 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>{section.title}</Typography>
                <Typography color="text.secondary">{section.description}</Typography>
              </CardContent>
              <CardActions>
                <Button disabled={!section.available} onClick={() => navigate(section.path)}>
                  {section.available ? appMessages.open : appMessages.comingSoon}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
