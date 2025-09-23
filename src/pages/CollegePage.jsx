import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Users, MapPin, Search, X } from "lucide-react";
import useCollegeStore from "@/stores/college.store";

const ExploreColleges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { colleges, fetchColleges, loading } = useCollegeStore();
  const [filters, setFilters] = useState({
    location: "all",
    mentorRange: "all",
  });

  useEffect(() => {
    fetchColleges(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  if (loading) return <div>Loading....</div>;
 
  const clearAllFilters = () => {
    setSearchTerm("");
    setFilters({
      location: "all",
      mentorRange: "all",
    });
  };

  const hasActiveFilters =
    filters.location !== "all" ||
    filters.mentorRange !== "all" ||
    searchTerm !== "";

  const filteredColleges = colleges.filter((college) => {
    if (!searchTerm || searchTerm.trim() === "") {
      return true;
    }

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (college.name && college.name.toLowerCase().includes(searchLower)) ||
      (college.location && college.location.toLowerCase().includes(searchLower)) ||
      (college.description && college.description.toLowerCase().includes(searchLower));
    
    return matchesSearch;
  });

  return (
    <div className="mt-[3rem] min-h-screen pt-7 bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-4 font-[family-name:var(--font-playfair)]">
              Explore Colleges
            </h1>
            <p className="text-lg max-w-2xl">
              Discover mentors from top colleges and institutions across India
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4" />
              <Input
                placeholder="Search colleges by name, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-base border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </div>

          {searchTerm && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <span className="font-medium">{filteredColleges.length}</span>{" "}
                college{filteredColleges.length !== 1 ? "s" : ""} found for "
                {searchTerm}"
                {hasActiveFilters && (
                  <Button
                    onClick={() => setSearchTerm("")}
                    variant="ghost"
                    size="sm"
                    className="ml-4 cursor-pointer h-auto p-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear search
                  </Button>
                )}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredColleges.map((college) => (
              <Card
                key={college.id}
                className="group hover:shadow-xl transition-all duration-300  hover:border-blue-300 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4  text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      {college.mentorCount} mentors
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-gray-700 transition-colors">
                      {college.name}
                    </h3>

                    <div className="flex items-center mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">
                        {college.location}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      {college.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-blue-400">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="font-medium">
                          {college.mentorCount} mentors available
                        </span>
                      </div>

                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="cursor-pointer group/btn border-blue-300 text-blue-900 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                      >
                        <Link to={`/college/${college.id}`}>
                          View Mentors
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-200 mt-8">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  {colleges.length === 0
                    ? "No colleges available"
                    : "No colleges match your search"}
                </h3>
                <p className="text-sm text-blue-600 mb-4">
                  {colleges.length === 0
                    ? "There are no colleges available at the moment."
                    : `No colleges found matching "${searchTerm}". Try adjusting your search terms.`}
                </p>
                {hasActiveFilters && (
                  <Button
                    onClick={clearAllFilters}
                    variant="outline"
                    className="cursor-pointer border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExploreColleges;
