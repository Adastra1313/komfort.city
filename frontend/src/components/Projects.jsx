import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { mockData } from '../mock';
import { 
  MapPin, 
  Zap, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  Filter
} from 'lucide-react';

const Projects = () => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('Всі');
  const projects = mockData.projects;

  const filters = ['Всі', 'Виробництво', 'ТРЦ', 'Готелі', 'Медицина'];

  const filteredProjects = selectedFilter === 'Всі' 
    ? projects 
    : projects.filter(project => project.sector.includes(selectedFilter));

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наші проєкти
          </h2>
          <p className="text-xl text-[#6E7B8B] max-w-3xl mx-auto">
            Кейси успішно реалізованих теплових систем з результатами та показниками
          </p>
          <div className="w-20 h-1 bg-[#27AE60] mx-auto rounded-full mt-6"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Filter className="h-5 w-5 text-[#6E7B8B] mt-2" />
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter)}
              className={`transition-all duration-200 ${
                selectedFilter === filter 
                  ? 'bg-[#27AE60] hover:bg-[#27AE60]/90 text-white' 
                  : 'border-gray-300 text-[#6E7B8B] hover:border-[#27AE60] hover:text-[#27AE60]'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden cursor-pointer"
            >
              {/* Project Image */}
              <div 
                className="h-56 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Sector Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#27AE60] text-white border-0">
                    {project.sector}
                  </Badge>
                </div>

                {/* Project Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-[#FF9900]" />
                    <div>
                      <p className="text-xs text-[#6E7B8B]">Потужність</p>
                      <p className="font-semibold text-gray-900">{project.power}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-[#27AE60]" />
                    <div>
                      <p className="text-xs text-[#6E7B8B]">Економія</p>
                      <p className="font-semibold text-[#27AE60]">{project.savings}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-[#6E7B8B]">Терміни</p>
                      <p className="font-semibold text-gray-900">{project.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-xs text-[#6E7B8B]">Паливо</p>
                      <p className="font-semibold text-gray-900">{project.fuelType}</p>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-[#27AE60] group-hover:text-white group-hover:border-[#27AE60] transition-all duration-300"
                >
                  Детальніше про проєкт
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-3 border-[#27AE60] text-[#27AE60] hover:bg-[#27AE60] hover:text-white transition-all duration-300"
          >
            Більше проєктів
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Success Stats */}
        <div className="mt-20 bg-gradient-to-r from-[#27AE60]/5 to-[#FF9900]/5 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#27AE60] mb-2">200+</div>
              <div className="text-[#6E7B8B]">Проєктів завершено</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF9900] mb-2">15-35%</div>
              <div className="text-[#6E7B8B]">Середня економія енергії</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#27AE60] mb-2">98%</div>
              <div className="text-[#6E7B8B]">Задоволених клієнтів</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF9900] mb-2">24/7</div>
              <div className="text-[#6E7B8B]">Технічна підтримка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;